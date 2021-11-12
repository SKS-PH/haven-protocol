import {Button} from '../components/Button';
import {ButtonVariant, LinkButton} from '../components/LinkButton';
import {Link} from 'solid-app-router';
import {SearchInput} from '../components/SearchInput';
import {Logo} from '../components/Logo';

const IndexPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <header
          className="h-24 bg-header"
          style={{
            '--color-bg-header': 'var(--color-negative-plus-3)',
          }}
        >
          <div className="px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <div>
                <h1 className="sr-only">
                  Haven
                </h1>
                <Logo />
              </div>
              <div>
                <form>
                  <SearchInput
                    name="q"
                    placeholder="Search for havens, users&hellip;"
                  />
                  <button
                    className="sr-only"
                  >
                    Search
                  </button>
                </form>
              </div>
              <div>
                <div className="flex space-x-4">
                  <div>
                    <LinkButton
                      component={Link}
                      href="/create-haven"
                      variant={ButtonVariant.OUTLINE}
                    >
                      Create Haven
                    </LinkButton>
                  </div>
                  <div>
                    <form>
                      <Button
                        variant={ButtonVariant.FILLED}
                      >
                        Connect
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-auto min-h-0 flex justify-center items-center relative">

          <div className="p-12 h-96 w-128 border border-dotted flex flex-col justify-center">
            <div className="flex items-center space-x-12">
              <div>
                <Logo />
              </div>
              <div>
                <p
                  className="lowercase text-6xl m-0 font-light"
                >
                  Haven
                </p>
                <p
                  className="lowercase text-5xl m-0 font-light"
                >
                  Spaces for you.
                </p>
              </div>
            </div>
            <div className="flex space-x-4 mt-12">
              <div className="w-0 flex-auto">
                <LinkButton
                  block
                  component={Link}
                  href="#what-is-haven"
                  variant={ButtonVariant.OUTLINE}
                >
                  Learn More
                </LinkButton>
              </div>
              <div className="w-0 flex-auto">
                <form>
                  <Button
                    block
                    variant={ButtonVariant.FILLED}
                  >
                    Connect Wallet
                  </Button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      <section>

      </section>
    </>
  )
}

export default IndexPage;
