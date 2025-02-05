import { INodeProperties } from 'n8n-workflow';

export const Property: Record<string, INodeProperties> = {
	Template: {
		displayName: 'Template Url',
		name: 'template',
		//TODO: Enforce URL format
		type: 'string',
		default: '',
		placeholder: 'Cadence script template',
	},
	Arguments: {
		displayName: 'Arguments',
		name: 'arguments',
		type: 'fixedCollection',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'items',
				displayName: 'Argument',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
						options: [
							{ name: 'String', value: 'String' },
							{ name: 'Address', value: 'Address' },
							{ name: 'UInt', value: 'UInt' },
							{ name: 'UInt8', value: 'UInt8' },
							{ name: 'UInt16', value: 'UInt16' },
							{ name: 'UInt32', value: 'UInt32' },
							{ name: 'UInt64', value: 'UInt64' },
							{ name: 'UInt128', value: 'UInt128' },
							{ name: 'UInt256', value: 'UInt256' },
							{ name: 'Int', value: 'Int' },
							{ name: 'Int8', value: 'Int8' },
							{ name: 'Int16', value: 'Int16' },
							{ name: 'Int32', value: 'Int32' },
							{ name: 'Int64', value: 'Int64' },
							{ name: 'Int128', value: 'Int128' },
							{ name: 'Int256', value: 'Int256' },
							{ name: 'Word8', value: 'Word8' },
							{ name: 'Word16', value: 'Word16' },
							{ name: 'Word32', value: 'Word32' },
							{ name: 'Word64', value: 'Word64' },
							{ name: 'UFix64', value: 'UFix64' },
							{ name: 'Fix64', value: 'Fix64' },
							{ name: 'Character', value: 'Character' },
							{ name: 'Bool', value: 'Bool' },
						],
						required: true,
						default: 'String',
						description: 'Argument type',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Argument value',
					},
				],
			},
		],
	},
};
