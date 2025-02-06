import * as fcl from "@onflow/fcl"
import * as types from "@onflow/types"
import { Signer } from './signer';

//FIXME: Make it possible to switch dynamically
fcl.config({
	'accessNode.api': 'https://rest-testnet.onflow.org',
	'flow.network': 'testnet',
});

function argsWrapper(args) {
	return (arg, t) => args.map(({ value, type, optional }) => arg(value, optional ? t.Optional(t[type]) : t[type]));
}

function accountWrapper(account) {
	const signer = new Signer(account.privateKey);
	return (data) => {
		return {
			...data,
			tempId: `${account.address}-${account.keyId}`,
			addr: fcl.sansPrefix(account.address),
			keyId: Number(account.keyId),
			signingFunction: (signable) => {
				return Promise.resolve({
					f_type: "CompositeSignature",
					f_vsn: "1.0.0",
					addr: fcl.withPrefix(account.address),
					keyId: Number(account.keyId),
					signature: signer.signWithKey(signable.message),
				});
			}
		};
	};
}

export async function flowQuery(template, args) {
	const result = await fcl.query({
		template,
		args: argsWrapper(args),
	});
	return { result };
}

export async function flowMutate(template, args, account) {
	const hash = await fcl.mutate({
		template,
		limit: 50,
		args: argsWrapper(args),
		authz: accountWrapper(account),
	});
	const result = await fcl.tx(hash).onceSealed();
	return result;
}
