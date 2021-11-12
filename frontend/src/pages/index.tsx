import {Button} from '../components/Button';
import {ButtonVariant, LinkButton} from '../components/LinkButton';
import {Link} from 'solid-app-router';
import {SearchInput} from '../components/SearchInput';
import {Logo, LogoSize} from '../components/Logo';
import {Icon} from '../components/Icon';

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
          <div className="px-4 h-full box-border">
            <div className="flex justify-end sm:justify-between items-center h-full">
              <div className="hidden sm:block mr-4">
                <h1 className="sr-only">
                  Haven
                </h1>
                <Logo />
              </div>
              <div className="hidden sm:block mr-4">
                <form className="lg:w-120">
                  <SearchInput
                    name="q"
                    placeholder="Search for havens, users..."
                    block
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
                        <Icon name="metamask" className="h-8" />
                        <span>
                          Connect
                        </span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-auto min-h-0 flex justify-center items-center relative text-fg-inverse overflow-hidden">
          <div className="absolute bg-fg opacity-50 w-full h-full top-0 left-0" />
          <div className="absolute bg-primary opacity-50 w-full h-full top-0 left-0" />
          <div className="relative">
            <div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-16 box-border" />
            <div className="border opacity-25 border-dotted w-32 h-32 absolute -top-32 left-48 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-80 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-112 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute top-16 -left-16 box-border" />
            <div className="border opacity-25 border-dotted w-32 h-32 absolute top-32 -left-32 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute top-80 -left-16 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute -bottom-16 left-16 box-border" />
            <div className="border opacity-25 border-dotted w-32 h-32 absolute -bottom-32 left-64 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute -bottom-16 left-96 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute top-16 -right-16 box-border" />
            <div className="border opacity-25 border-dotted w-16 h-16 absolute top-64 -right-16 box-border" />

            <div className="p-8 sm:p-12 h-96 w-full max-w-160 border border-dotted flex flex-col justify-center relative box-border">
              <div className="flex items-center space-x-8 sm:space-x-12">
                <div>
                  <Logo
                    size={LogoSize.LARGE}
                  />
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
              <div className="sm:flex space-y-4 sm:space-y-0 w-full sm:space-x-4 mt-8 sm:mt-12">
                <div className="sm:w-0 flex-auto">
                  <LinkButton
                    block
                    component={Link}
                    href="#what-is-haven"
                    variant={ButtonVariant.OUTLINE_INVERSE}
                  >
                    Learn More
                  </LinkButton>
                </div>
                <div className="sm:w-0 flex-auto">
                  <form>
                    <Button
                      block
                      variant={ButtonVariant.FILLED_INVERSE}
                    >
                      <Icon name="metamask" className="h-8" />
                      <span>
                        Connect Wallet
                      </span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <section id="what-is-haven">
        <div className="container mx-auto py-16 box-border">
          <h2 className="font-light text-6xl">
            What is Haven?
          </h2>
          <p className="text-2xl">
            Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
          </p>
          <p>
            Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's gonna stand up for yourself, someone who's gonna protect her.
          </p>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-16 md:flex box-border">
          <div
            className="md:w-0 flex-auto"
          >

          </div>
          <div
            className="md:w-0 flex-auto"
          >
            <h3 className="font-light text-5xl">
              Anti-platform risk
            </h3>
            <p className="text-2xl">
              Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
            </p>
            <p>
              Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's gonna stand up for yourself, someone who's gonna protect her.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-16 md:flex box-border">
          <div
            className="md:w-0 flex-auto"
          >

          </div>
          <div
            className="md:w-0 flex-auto"
          >
            <h3 className="font-light text-5xl">
              <abbr>DAO</abbr> governance
            </h3>
            <p className="text-2xl">
              Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
            </p>
            <p>
              Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's gonna stand up for yourself, someone who's gonna protect her.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-16 md:flex box-border">
          <div
            className="md:w-0 flex-auto"
          >

          </div>
          <div
            className="md:w-0 flex-auto"
          >
            <h3 className="font-light text-5xl">
              Customisation
            </h3>
            <p className="text-2xl">
              Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
            </p>
            <p>
              Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's gonna stand up for yourself, someone who's gonna protect her.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-16 md:flex box-border">
          <div
            className="md:w-0 flex-auto"
          >

          </div>
          <div
            className="md:w-0 flex-auto"
          >
            <h3 className="font-light text-5xl">
              Democratisation
            </h3>
            <p className="text-2xl">
              Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
            </p>
            <p>
              Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's gonna stand up for yourself, someone who's gonna protect her.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-16 lg:flex items-center space-y-8 lg:space-y-0 lg:space-x-16 box-border text-center lg:text-left">
          <div className="flex-auto">
            <h3 className="font-light text-5xl mt-0">
              Sounds good?
            </h3>
            <p className="text-2xl m-0">
              Get started by exploring havens or creating your own.
            </p>
          </div>
          <div className="lg:w-96">
            <form>
              <SearchInput
                placeholder="Search for havens, users..."
                block
              />
            </form>
          </div>
          <div>
            or
          </div>
          <div>
            <form>
              <Button
                block
                variant={ButtonVariant.FILLED}
              >
                <Icon name="metamask" className="h-8" />
                <span>
                  Connect Wallet
                </span>
              </Button>
            </form>
          </div>
        </div>
      </section>
      <footer
        className="bg-fg text-fg-inverse"
      >
        <div className="container mx-auto py-16 box-border">
          <div className="text-center space-y-8">
            <div>
              <p className="font-light text-5xl lowercase m-0">
                Haven
              </p>
              <p className="text-2xl lowercase m-0">
                Spaces for you.
              </p>
            </div>
            <p>
              Copyright &copy; SKS PH {new Date().getFullYear()}
            </p>
            <div className="inline-flex space-x-4">
              <a>
                <Icon
                  name="github"
                />
              </a>
              {' '}
              <a>
                <Icon
                  name="link"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default IndexPage;
