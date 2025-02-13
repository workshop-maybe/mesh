import { mnemonicToEntropy } from 'bip39';
import { AssetFingerprint, csl } from '@mesh/core';
import {
  buildBip32PrivateKey, buildRewardAddress,
} from './builder';
import {
  toAddress, toBaseAddress, toBytes,
  toEnterpriseAddress, toPlutusData, toRewardAddress,
} from './converter';
import {
  deserializePlutusScript, deserializeTx,
} from './deserializer';
import type { Data } from '@mesh/common/types';

export const resolveDataHash = (data: Data) => {
  const plutusData = toPlutusData(data);
  const dataHash = csl.hash_plutus_data(plutusData);
  return dataHash.to_hex();
};

export const resolveFingerprint = (policyId: string, assetName: string) => {
  return AssetFingerprint.fromParts(
    toBytes(policyId),
    toBytes(assetName)
  ).fingerprint();
};

export const resolvePaymentKeyHash = (bech32: string) => {
  try {
    const paymentKeyHash = [
      toBaseAddress(bech32)?.payment_cred().to_keyhash(),
      toEnterpriseAddress(bech32)?.payment_cred().to_keyhash(),
    ].find((kh) => kh !== undefined);

    if (paymentKeyHash !== undefined)
      return paymentKeyHash.to_hex();

    throw new Error(`Couldn't resolve payment key hash from address: ${bech32}`);
  } catch (error) {
    throw new Error(`An error occurred during resolvePaymentKeyHash: ${error}.`);
  }
};

export const resolvePrivateKey = (words: string[]) => {
  const entropy = mnemonicToEntropy(words.join(' '));
  const bip32PrivateKey = buildBip32PrivateKey(entropy);
  const bech32PrivateKey = bip32PrivateKey.to_bech32();

  bip32PrivateKey.free();

  return bech32PrivateKey;
};

export const resolveScriptAddress = (networkId: number, cborPlutusScript: string) => {
  const script = deserializePlutusScript(cborPlutusScript);

  const enterpriseAddress = csl.EnterpriseAddress.new(networkId,
    csl.StakeCredential.from_scripthash(script.hash()),
  );

  return enterpriseAddress.to_address().to_bech32();
};

export const resolveScriptHash = (bech32: string) => {
  try {
    const enterpriseAddress = toEnterpriseAddress(bech32);
    const scriptHash = enterpriseAddress?.payment_cred()
      .to_scripthash();

    if (scriptHash !== undefined)
      return scriptHash.to_hex();

    throw new Error(`Couldn't resolve script hash from address: ${bech32}`);
  } catch (error) {
    throw new Error(`An error occurred during resolveScriptHash: ${error}.`);
  }
};

export const resolveStakeAddress = (bech32: string) => {
  try {
    const address = toAddress(bech32);
    const baseAddress = toBaseAddress(bech32);
    const stakeKeyHash = baseAddress?.stake_cred().to_keyhash();

    if (stakeKeyHash !== undefined)
      return buildRewardAddress(address.network_id(), stakeKeyHash)
        .to_address().to_bech32();

    throw new Error(`Couldn't resolve stake address from address: ${bech32}`);
  } catch (error) {
    throw new Error(`An error occurred during resolveStakeAddress: ${error}.`);
  }
};

export const resolveStakeKeyHash = (bech32: string) => {
  try {
    const stakeKeyHash = [
      toBaseAddress(bech32)?.stake_cred().to_keyhash(),
      toRewardAddress(bech32)?.payment_cred().to_keyhash(),
    ].find((kh) => kh !== undefined);

    if (stakeKeyHash !== undefined)
      return stakeKeyHash.to_hex();

    throw new Error(`Couldn't resolve stake key hash from address: ${bech32}`);
  } catch (error) {
    throw new Error(`An error occurred during resolveStakeKeyHash: ${error}.`);
  }
};

export const resolveTxHash = (cborTx: string) => {
  const txBody = deserializeTx(cborTx).body();
  const txHash = csl.hash_transaction(txBody);
  return txHash.to_hex();
};
