import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { flowQuery } from './utils';
import { Property } from './commons';

export class FlowChainQuery implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'The Flow Query',
		name: 'flowChainQuery',
		group: ['transform', 'output'],
		version: 1,
		description: 'Call query script on the Flow blockchain (Testnet)',
		icon: 'file:flow.svg',
		defaults: {
			name: 'The Flow - Query',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'flowChainApi',
				required: true,
			},
		],
		properties: [Property.Template, Property.Arguments],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const outputs = [] as INodeExecutionData[];
		// Variables could have different value for each item in case they contain an expression
		for (let index = 0; index < items.length; index++) {
			try {
				const template = this.getNodeParameter('template', index, '') as string;
				const { items: args } = this.getNodeParameter('arguments', index) as { items: object[] };
				const json = await flowQuery(template, args);
				outputs.push({ json });
			} catch (error) {
				if (this.continueOnFail()) {
					const { json } = this.getInputData(index)[0];
					items.push({ json, error, pairedItem: index });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property, only append the itemIndex
						error.context.itemIndex = index;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex: index,
					});
				}
			}
		}
		return this.prepareOutputData(outputs);
	}
}
