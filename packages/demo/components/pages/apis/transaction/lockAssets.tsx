import { useEffect, useState } from 'react';
import Codeblock from '../../../ui/codeblock';
import Card from '../../../ui/card';
import RunDemoButton from '../common/runDemoButton';
import RunDemoResult from '../common/runDemoResult';
import SectionTwoCol from '../common/sectionTwoCol';
import useWallet from '../../../../contexts/wallet';
import ConnectCipWallet from '../common/connectCipWallet';
import Input from '../../../ui/input';
import { Transaction, Asset } from '@martifylabs/mesh';
import FetchSelectAssets from '../common/fetchSelectAssets';

// always succeed
const script = '4e4d01000033222220051200120011';
const scriptAddress =
  'addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8';

export default function LockAssets() {
  const { walletConnected } = useWallet();
  const [inputDatum, setInputDatum] = useState<string>('supersecret'); // user input for datum
  const [userInput, setUserInput] = useState<
    { assets: { [unit: string]: string } }[]
  >([
    {
      assets: {
        '64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e':
          '1',
      },
    },
  ]);

  useEffect(() => {
    async function init() {
      const newRecipents = [
        {
          assets: {},
        },
      ];
      setUserInput(newRecipents);
    }
    if (walletConnected) {
      init();
    }
  }, [walletConnected]);

  function updateField(action, index, field, value) {
    let updated = [...userInput];
    if (action == 'update') {
      if (value == 0) {
        delete updated[index].assets[field];
      } else {
        if (value >= 0) {
          updated[index].assets[field] = value;
        }
      }
    }
    setUserInput(updated);
  }

  return (
    <SectionTwoCol
      sidebarTo="lockAssets"
      header="Lock assets on smart contract"
      leftFn={Left({ userInput, inputDatum })}
      rightFn={Right({
        userInput,
        updateField,
        inputDatum,
        setInputDatum,
      })}
    />
  );
}

function Left({ userInput, inputDatum }) {
  let codeSnippet = `import { Transaction, Asset } from '@martifylabs/mesh';\n\n`;
  codeSnippet += `const tx = new Transaction({ initiator: wallet })`;
  for (const recipient of userInput) {
    let nativeAssets = Object.keys(recipient.assets).filter((assetId) => {
      return assetId != 'lovelace';
    });
    if (nativeAssets.length) {
      codeSnippet += `\n  .sendAssets(\n    "${scriptAddress}",`;
      codeSnippet += `\n    [`;
      for (const asset of nativeAssets) {
        codeSnippet += `\n      {`;
        codeSnippet += `\n        unit: "${asset}",`;
        codeSnippet += `\n        quantity: "1",`;
        codeSnippet += `\n      },`;
      }
      codeSnippet += `\n    ],\n`;
      codeSnippet += `    { datum: '${inputDatum}' }`;
      codeSnippet += `\n  )`;
    }
  }
  codeSnippet += `;\n`;
  codeSnippet += `const unsignedTx = await tx.build();\n`;
  codeSnippet += `const signedTx = await wallet.signTx(unsignedTx);\n`;
  codeSnippet += `const txHash = await wallet.submitTx(signedTx);`;

  return (
    <>
      <p>
        Token locking is a feature where certain assets are reserved on the
        smart contract. The assets can only be unlocked when certain conditions
        are met, for example, when making a purchase.
      </p>
      <p>
        In this showcase, we will lock selected assets from your wallet to an
        <code>always succeed</code> smart contract, where unlocking assets
        requires the correct datum. In practice, multiple assets (both native
        assets and lovelace) can be sent to the contract in a single
        transaction; in this demo, we restrict to only one asset.
      </p>
      <p>Here's the full code:</p>
      <Codeblock data={codeSnippet} isJson={false} />
      <p>
        If the transaction is successful, you may want to copy one of the
        asset's <code>unit</code> and the <code>datum</code> you used in this
        transaction. These information are required to unlock the assets.
      </p>
    </>
  );
}

function Right({ userInput, updateField, inputDatum, setInputDatum }) {
  const [state, setState] = useState<number>(0);
  const [response, setResponse] = useState<null | any>(null);
  const [responseError, setResponseError] = useState<null | any>(null);
  const { wallet, walletConnected, hasAvailableWallets, updateUserStorage } =
    useWallet();

  async function runDemo() {
    setState(1);
    setResponseError(null);

    try {
      const tx = new Transaction({ initiator: wallet });

      const assets: Asset[] = Object.keys(userInput[0].assets).map(
        (asset: string) => ({
          unit: asset,
          quantity: '1',
        })
      );

      console.log(111, Object.keys(userInput[0].assets)[0]);
      updateUserStorage('lockedAssetUnit', Object.keys(userInput[0].assets)[0]);

      tx.sendAssets(scriptAddress, assets, { datum: inputDatum });
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      setResponse(txHash);
      setState(2);
    } catch (error) {
      setResponseError(`${error}`);
      setState(0);
    }
  }

  return (
    <Card>
      <InputTable
        userInput={userInput}
        updateField={updateField}
        inputDatum={inputDatum}
        setInputDatum={setInputDatum}
      />
      {hasAvailableWallets && (
        <>
          {walletConnected ? (
            <>
              <RunDemoButton
                runDemoFn={runDemo}
                loading={state == 1}
                response={response}
              />
              <RunDemoResult response={response} />
            </>
          ) : (
            <ConnectCipWallet />
          )}
        </>
      )}
      <RunDemoResult response={responseError} label="Error" />
    </Card>
  );
}

function InputTable({ userInput, updateField, inputDatum, setInputDatum }) {
  function selectAsset(id, unit) {
    if (unit in userInput[id].assets) {
      updateField('update', id, unit, '0');
    } else {
      updateField('update', id, unit, '1');
    }
  }

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-0">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Lock assets in smart contract
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Define a datum and select assets to lock in smart contract. Note:
            this demo only works on <code>preview</code> network.
          </p>
        </caption>
        <thead className="thead">
          <tr>
            <th scope="col" className="py-3">
              Lock assets in smart contract
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
              <Input
                value={inputDatum}
                onChange={(e) => setInputDatum(e.target.value)}
                placeholder="Datum"
                label="Datum"
              />
              <FetchSelectAssets
                index={0}
                selectedAssets={userInput.length ? userInput[0].assets : []}
                selectAssetFn={selectAsset}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
