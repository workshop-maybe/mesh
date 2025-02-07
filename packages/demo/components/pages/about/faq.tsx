import Link from 'next/link';

export default function AboutFaq() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-lg text-center">
          <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Information and Common Questions
          </h2>
          <p className="mb-8 text-gray-500 lg:text-lg dark:text-gray-400">
            Ask us anything on our{' '}
            <a
              href="https://discord.gg/Z6AH9dahdH"
              rel="noreferrer"
              className="link"
              target="_blank"
            >
              Discord server
            </a>
          </p>
        </div>

        <div className="grid pt-8 text-left border-t border-gray-200 dark:border-gray-700 sm:gap-8 lg:gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Item
              header={`Why Mesh?`}
              body={
                <>
                  <p>
                    The word "
                    <a
                      href="https://dictionary.cambridge.org/dictionary/english/mesh"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      Mesh
                    </a>
                    " is defined as:{' '}
                  </p>
                  <ul>
                    <li>
                      <i>
                        when different things or people mesh, they suit each
                        other or work well together
                      </i>
                    </li>
                    <li>
                      <i>
                        (of two or more things) to fit together or be suitable
                        for each other
                      </i>
                    </li>
                  </ul>
                  <p>
                    Like a well-woven fabric, Mesh connects business goals with
                    technology stacks. It enables developers (<i>resource</i>)
                    to build applications (<i>product</i>) according to project
                    requirements (<i>business</i>) on the blockchain (
                    <i>technology</i>). Mesh is filling the gap by making
                    product development accessible on Cardano.
                  </p>
                  <p>
                    Whether you're a new developer, startup, Web3 market leader,
                    or a large enterprise, Mesh makes Web3 development easy with
                    reliable, scalable, and well-engineered APIs & developer
                    tools.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <Item
              header="Is Mesh open source and open for contributions?"
              body={
                <>
                  <p>
                    Yes, Mesh is open source, and we welcome all contributions.
                    Developers, businesses, and writers can contribute in
                    various ways. You can write, test, or review the codes; you
                    can create your project and design your product to use Mesh;
                    you can improve or write new documentation and guides to
                    help other builders; you can also provide feedback, ideas,
                    improvements, and feature requests.
                  </p>
                  <p>
                    Connect and chat with us at our{' '}
                    <a
                      href="https://discord.gg/Z6AH9dahdH"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      Discord server
                    </a>{' '}
                    or email us at{' '}
                    <a
                      href="mailto:contact@martify.io"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      contact@martify.io
                    </a>
                    .
                  </p>
                </>
              }
            />

            <Item
              header="Help, I'm Stuck!"
              body={
                <>
                  <p>
                    If you get stuck, you can ask questions at{' '}
                    <a
                      href="https://cardano.stackexchange.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      cardano.stackexchange.com
                    </a>{' '}
                    and tagged it with <code>mesh</code>.
                  </p>
                  <p>
                    If you don't receive an answer, please file{' '}
                    <a
                      href="https://github.com/MartifyLabs/mesh/issues"
                      target="_blank"
                      rel="noreferrer"
                    >
                      an issue
                    </a>
                    , and we will help you out.
                  </p>
                  <p>
                    You can also ask questions on{' '}
                    <a
                      href="https://discord.gg/Z6AH9dahdH"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Martify&apos;s
                    </a>
                    ,{' '}
                    <a
                      href="https://discord.gg/Va7DXqSSn8"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Gimbalabs&apos;
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://discord.gg/inputoutput"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IOG Technical Community&apos;s
                    </a>{' '}
                    Discord servers.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <Item
              header="Who are behind Mesh?"
              body={
                <>
                  <p>
                    Mesh has been created and is continuously developed by{' '}
                    <a
                      href="https://martify.io/"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      Martify Labs
                    </a>
                    . We build intuitive and well-engineered tools and services
                    for creators and companies who plan to develop on Cardano.
                  </p>
                  <p>
                    As Mesh is open source, the people in the Cardano
                    development community are a part of this journey. We look
                    forward to more developers and writers joining us to develop
                    this fantastic tool further. The users of Cardano
                    applications are also a part of Mesh, as they make it
                    possible for developers to build, adapt and improve current
                    and future applications.
                  </p>
                </>
              }
            />
            <Item
              header="About this Playground"
              body={
                <>
                  <p>
                    Mesh playground is an interactive tool which allows you to
                    explore Mesh's features. Most APIs are interactive, where
                    you can modify the inputs and see how to use the code in
                    your project.
                  </p>
                  <p>
                    This website is build with{' '}
                    <a
                      href="https://nextjs.org/"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      Next.js
                    </a>{' '}
                    and designed with{' '}
                    <a
                      href="https://flowbite.com/"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      Flowbite
                    </a>
                    . If you wish to build a site like this, we have a{' '}
                    <a
                      href="https://mesh.martify.io/guides/nextjs"
                      rel="noreferrer"
                      className="link"
                      target="_blank"
                    >
                      guide
                    </a>{' '}
                    for you to get started.
                  </p>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ header, body }) {
  return (
    <div className="mb-10 format">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        {header}
      </h3>
      <div className="text-gray-500 dark:text-gray-400">{body}</div>
    </div>
  );
}
