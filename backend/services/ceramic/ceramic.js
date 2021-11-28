var _a;
import { Ceramic } from '@ceramicnetwork/core';
import IPFS from 'ipfs-core';
import dagJoseDefault from 'dag-jose';
import { convert } from 'blockcodec-to-ipld-format';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import ThreeIdProvider from '3id-did-provider';
import { randomBytes } from '@stablelib/random';
import { DID } from 'dids';
const dagJoseModule = dagJoseDefault;
const dagJose = (_a = dagJoseModule['default']) !== null && _a !== void 0 ? _a : dagJoseDefault;
const dagJoseFormat = convert(dagJose);
const CERAMIC_API_URL = 'http://localhost:7007';
const ipfs = await IPFS.create({ ipld: { formats: [dagJoseFormat] } });
const ceramic = await Ceramic.create(ipfs);
const resolver = Object.assign(Object.assign({}, KeyDidResolver.getResolver()), ThreeIdResolver.getResolver(ceramic));
const did = new DID({ resolver });
ceramic.did = did;
const posts = [];
const didSetup = async () => {
    var _a;
    const authId = 'myAuthenticationMethod'; // a name of the auth method
    const authSecret = randomBytes(32);
    const getPermission = async (request) => {
        return request.payload.paths;
    };
    const ThreeIdProviderModule = ThreeIdProvider;
    const ThreeIdProviderClass = (_a = ThreeIdProviderModule['default']) !== null && _a !== void 0 ? _a : ThreeIdProvider;
    const threeId = await ThreeIdProviderClass.create({
        authId: 'genesis',
        authSecret,
        getPermission,
        ceramic
    });
    const resolver = Object.assign(Object.assign({}, KeyDidResolver.getResolver()), ThreeIdResolver.getResolver(ceramic));
    const provider = threeId.getDidProvider();
    const did = new DID({ resolver });
    did.setProvider(provider);
    ceramic.did = did;
    ceramic.did.authenticate();
};
const instance = ceramic;
export default {
    didSetup,
    instance
};
