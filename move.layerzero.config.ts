import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

enum MsgType {
    SEND = 1,
    SEND_AND_CALL = 2,
}

const bscContract: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_MAINNET,
    contractName: 'MyOFT',
}

const aptosContract: OmniPointHardhat = {
    eid: EndpointId.APTOS_V2_MAINNET,
    contractName: 'MyOFT',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: bscContract,
            config: {
                owner: '', // TODO: update with deployed owner
                delegate: '', // TODO: update with deployed delegate
            },
        },
        {
            contract: aptosContract,
            config: {
                delegate: '', // TODO: update with deployed delegate
                owner: '', // TODO: update with deployed owner
            },
        },
    ],
    connections: [
        {
            from: aptosContract,
            to: bscContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: MsgType.SEND,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 80_000, // gas limit in wei for EndpointV2.lzReceive
                        value: 0, // msg.value in wei for EndpointV2.lzReceive
                    },
                    {
                        msgType: MsgType.SEND_AND_CALL,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 80_000, // gas limit in wei for EndpointV2.lzReceive
                        value: 0, // msg.value in wei for EndpointV2.lzReceive
                    },
                ],
                sendLibrary: '0xc33752e0220faf79e45385dd73fb28d681dcd9f1569a1480725507c1f3c3aba9', // TODO: update with deployed send library
                receiveLibraryConfig: {
                    // Required Receive Library Address on Aptos
                    receiveLibrary: '0xc33752e0220faf79e45385dd73fb28d681dcd9f1569a1480725507c1f3c3aba9', // TODO: update with deployed receive library
                    // Optional Grace Period for Switching Receive Library Address on Aptos
                    gracePeriod: BigInt(0),
                },
                // Optional Receive Library Timeout for when the Old Receive Library Address will no longer be valid on Aptos
                // receiveLibraryTimeoutConfig: {
                //     lib: '0xbe533727aebe97132ec0a606d99e0ce137dbdf06286eb07d9e0f7154df1f3f10',
                //     expiry: BigInt(1000000000),
                // },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10_000,
                        // The configured Executor address on Aptos
                        executor: '0x15a5bbf1eb7998a22c9f23810d424abe40bd59ddd8e6ab7e59529853ebed41c4', // TODO: update with deployed executor
                    },
                    ulnConfig: {
                        // The number of block confirmations to wait on Aptos before emitting the message from the source chain.
                        confirmations: BigInt(5),
                        // The address of the DVNs you will pay to verify a sent message on the source chain.
                        // The destination tx will wait until ALL `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '0xdf8f0a53b20f1656f998504b81259698d126523a31bdbbae45ba1e8a3078d8da', // LayerZero Labs
                            // '0xad0433faab11432d46bdd1fc713873bb875920482e61081e447c9871e9a0e5ce', // Bitgo
                        ], // TODO: update with deployed DVNs
                        // The address of the DVNs you will pay to verify a sent message on the source chain.
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
                // Optional Receive Configuration
                // @dev Controls how the `from` chain receives messages from the `to` chain.
                receiveConfig: {
                    ulnConfig: {
                        // The number of block confirmations to expect from the `to` chain.
                        confirmations: BigInt(5),
                        // The address of the DVNs your `receiveConfig` expects to receive verifications from on the `from` chain.
                        // The `from` chain's OApp will wait until the configured threshold of `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '0xdf8f0a53b20f1656f998504b81259698d126523a31bdbbae45ba1e8a3078d8da', // LayerZero Labs
                            // '0xad0433faab11432d46bdd1fc713873bb875920482e61081e447c9871e9a0e5ce', // Bitgo
                        ], // TODO: update with deployed DVNs
                        // The address of the `optionalDVNs` you expect to receive verifications from on the `from` chain.
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify the message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bscContract,
            to: aptosContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: MsgType.SEND,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 5_000, // gas limit in wei for EndpointV2.lzReceive
                        value: 0, // msg.value in wei for EndpointV2.lzReceive
                    },
                    {
                        msgType: MsgType.SEND_AND_CALL,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 5_000, // gas limit in wei for EndpointV2.lzCompose
                        value: 0, // msg.value in wei for EndpointV2.lzCompose
                    },
                ],
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE', // TODO: update with deployed send library
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1', // TODO: update with deployed receive library
                    gracePeriod: BigInt(0),
                },
                // receiveLibraryTimeoutConfig: {
                //     lib: '0x188d4bbCeD671A7aA2b5055937F79510A32e9683',
                //     expiry: BigInt(67323472),
                // },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10_000,
                        executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859', // TODO: update with deployed executor
                    },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0xfd6865c841c2d64565562fcc7e05e619a30615f0', // LayerZero Labs
                            // '0xa2ceb887f545400b8247dfb7e9ccada7ababbde8', // Bitgo
                        ], // TODO: update with deployed DVNs
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0xfd6865c841c2d64565562fcc7e05e619a30615f0', // LayerZero Labs
                            // '0xa2ceb887f545400b8247dfb7e9ccada7ababbde8', // Bitgo
                        ], // TODO: update with deployed DVNs
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

export default config
