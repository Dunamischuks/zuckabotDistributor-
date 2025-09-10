import { ethers } from "ethers"

// Contract addresses
export const ZUCKA_TOKEN_ADDRESS = "0x54bff3901d7d27ffe21b9a23bc8efb48c9847048"
export const DISTRIBUTOR_ADDRESS = "0xec222Dba73C17877773E411D15904bf205FbA149"
export const TREASURY_ADDRESS = "0x42e8D84Ff8ff8e5EaE8E2648Ebfa772ee4515c91"

// Contract ABIs
export const ZUCKA_TOKEN_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
]

export const DISTRIBUTOR_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_zuckaToken", type: "address" },
      { internalType: "address", name: "_priceFeed", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "zuckaAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "bnbPaid", type: "uint256" },
    ],
    name: "ClaimFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    name: "ClaimInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "bnbAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "zuckaAmount", type: "uint256" },
    ],
    name: "Donated",
    type: "event",
  },
  {
    inputs: [],
    name: "BASE_RATE_PER_USD18",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CLAIM_AMOUNT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CLAIM_FEE_USD18",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TREASURY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "donate", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "finalizeClaim", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [],
    name: "getLatestBNBPrice18",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotals",
    outputs: [
      { internalType: "uint256", name: "tokensDistributed", type: "uint256" },
      { internalType: "uint256", name: "bnbCollectedWei", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "hasClaimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "initiateClaim", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "pendingClaimTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [{ internalType: "contract AggregatorV3Interface", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requiredClaimWei",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "secondsUntilFinalize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDonatedBNB",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "usd18", type: "uint256" }],
    name: "usd18ToWei",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "weiAmount", type: "uint256" }],
    name: "weiToUsd18",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zucka",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
]

// Web3 utility functions
export const getProvider = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    console.log("[v0] Using browser wallet provider")
    return new ethers.BrowserProvider(window.ethereum)
  }

  const rpcEndpoints = [
    "https://bsc-dataseed.binance.org/",
    "https://rpc.ankr.com/bsc",
    "https://bsc-dataseed1.defibit.io/",
  ]

  // Test each RPC endpoint for actual connectivity
  for (const rpc of rpcEndpoints) {
    try {
      console.log(`[v0] Testing RPC endpoint: ${rpc}`)
      const provider = new ethers.JsonRpcProvider(rpc)

      console.log(`[v0] Testing contract connectivity on ${rpc}`)
      const testContract = new ethers.Contract(DISTRIBUTOR_ADDRESS, DISTRIBUTOR_ABI, provider)

      // Try to call a simple view function to test connectivity
      const claimAmount = await testContract.CLAIM_AMOUNT()
      console.log(`[v0] Contract test successful on ${rpc}, CLAIM_AMOUNT:`, claimAmount.toString())

      return provider
    } catch (error) {
      console.warn(`[v0] RPC endpoint ${rpc} failed contract test:`, error)
      continue
    }
  }

  console.error("[v0] All RPC endpoints failed contract connectivity test")
  throw new Error("No working RPC endpoint found for BSC network")
}

export const getSigner = async () => {
  const provider = await getProvider()
  if (provider && typeof window !== "undefined" && window.ethereum) {
    try {
      return await provider.getSigner()
    } catch (error) {
      console.error("[v0] Failed to get signer:", error)
      return null
    }
  }
  return null
}

export const getDistributorContractReadOnly = async () => {
  try {
    const provider = await getProvider()
    if (!provider) {
      throw new Error("No provider available for read-only contract")
    }

    console.log("[v0] Creating read-only contract with provider:", provider.constructor.name)
    const contract = new ethers.Contract(DISTRIBUTOR_ADDRESS, DISTRIBUTOR_ABI, provider)

    console.log("[v0] Testing contract functionality...")
    const claimAmount = await contract.CLAIM_AMOUNT()
    console.log("[v0] Contract test successful, CLAIM_AMOUNT:", claimAmount.toString())

    return contract
  } catch (error) {
    console.error("[v0] Failed to create working read-only distributor contract:", error)
    throw error
  }
}

export const getDistributorContract = async () => {
  try {
    const signer = await getSigner()
    if (signer) {
      return new ethers.Contract(DISTRIBUTOR_ADDRESS, DISTRIBUTOR_ABI, signer)
    }
    return getDistributorContractReadOnly()
  } catch (error) {
    console.error("[v0] Failed to get distributor contract:", error)
    return null
  }
}

export const getTokenContract = async () => {
  try {
    const signer = await getSigner()
    if (signer) {
      return new ethers.Contract(ZUCKA_TOKEN_ADDRESS, ZUCKA_TOKEN_ABI, signer)
    }
    const provider = await getProvider()
    if (provider) {
      return new ethers.Contract(ZUCKA_TOKEN_ADDRESS, ZUCKA_TOKEN_ABI, provider)
    }
    return null
  } catch (error) {
    console.error("[v0] Failed to get token contract:", error)
    return null
  }
}

export const SUPPORTED_NETWORKS = {
  BSC: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
  POLYGON: {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  ETHEREUM: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
}

export const connectWallet = async (walletType: string) => {
  if (typeof window === "undefined") return null

  try {
    let provider = null

    console.log(`[v0] Connecting to ${walletType}...`)

    if (window.ethereum) {
      if (walletType === "metamask" && window.ethereum.isMetaMask) {
        provider = window.ethereum
      } else if (walletType === "trust" && window.ethereum.isTrust) {
        provider = window.ethereum
      } else if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
        const targetProvider = window.ethereum.providers.find(
          (p: any) => (walletType === "metamask" && p.isMetaMask) || (walletType === "trust" && p.isTrust),
        )
        provider = targetProvider || window.ethereum.providers[0]
      } else {
        provider = window.ethereum
      }
    } else {
      throw new Error(`${walletType} not detected. Please install ${walletType} or use ${walletType} mobile browser.`)
    }

    if (!provider) {
      throw new Error(`Failed to initialize ${walletType} provider`)
    }

    console.log(`[v0] Requesting account access for ${walletType}...`)

    const accountsPromise = provider.request({
      method: "eth_requestAccounts",
      params: [],
    })

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection timeout - please check your wallet")), 15000),
    )

    const accounts = await Promise.race([accountsPromise, timeoutPromise])

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock your wallet and try again.")
    }

    const userAccount = accounts[0]
    console.log(`[v0] ${walletType} connected successfully:`, userAccount)

    try {
      const chainId = await provider.request({ method: "eth_chainId" })
      if (chainId !== SUPPORTED_NETWORKS.BSC.chainId) {
        console.log("[v0] Attempting to switch to BSC network...")
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: SUPPORTED_NETWORKS.BSC.chainId }],
        })
      }
    } catch (networkError) {
      console.warn("[v0] Network switch failed, continuing with current network:", networkError)
    }

    return userAccount
  } catch (error: any) {
    console.error(`[v0] ${walletType} connection error:`, error)

    if (error.code === 4001) {
      throw new Error("Connection rejected by user")
    } else if (error.code === -32002) {
      throw new Error("Connection request pending - check your wallet")
    } else if (error.code === 4100) {
      throw new Error("Wallet is locked - please unlock and try again")
    }

    throw new Error(error.message || `Failed to connect ${walletType}`)
  }
}

export const switchToNetwork = async (networkKey: keyof typeof SUPPORTED_NETWORKS) => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Web3 wallet detected")
  }

  const network = SUPPORTED_NETWORKS[networkKey]

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainId }],
    })
  } catch (switchError: any) {
    // If the chain hasn't been added to the wallet, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [network],
      })
    } else {
      throw new Error(`Failed to switch to ${network.chainName}`)
    }
  }
}

export const getCurrentNetwork = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    return null
  }

  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" })

    for (const [key, network] of Object.entries(SUPPORTED_NETWORKS)) {
      if (network.chainId === chainId) {
        return { key, ...network }
      }
    }

    return { key: "UNKNOWN", chainId, chainName: "Unknown Network" }
  } catch (error) {
    console.error("Error getting current network:", error)
    return null
  }
}

// Utility to format large numbers
export const formatTokenAmount = (amount: string, decimals = 18) => {
  const value = ethers.formatUnits(amount, decimals)
  const num = Number.parseFloat(value)

  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"
  }

  return num.toFixed(2)
}

// Function to add Zuckabot token to user's wallet
export const addTokenToWallet = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No Web3 wallet detected")
  }

  try {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: ZUCKA_TOKEN_ADDRESS,
          symbol: "ZUCKA",
          decimals: 18,
          image: "https://www.zuckabot.xyz/images/zuckabot-logo.png",
        },
      },
    })
    return true
  } catch (error) {
    console.error("Error adding token to wallet:", error)
    throw new Error("Failed to add token to wallet")
  }
}

export const detectBrowserType = () => {
  if (typeof window === "undefined") {
    return {
      isWeb3Capable: false,
      browserType: "server",
      isMobile: false,
      recommendation: "Please use a Web3-enabled browser",
      supportedNetworks: [],
    }
  }

  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isWeb3Capable = !!window.ethereum

  let browserType = "unknown"
  let recommendation = ""
  let supportedNetworks: string[] = []

  // Detect specific browsers and wallets
  if (userAgent.includes("chrome")) browserType = "chrome"
  else if (userAgent.includes("firefox")) browserType = "firefox"
  else if (userAgent.includes("safari")) browserType = "safari"
  else if (userAgent.includes("edge")) browserType = "edge"

  // Detect wallet types
  if (window.ethereum?.isMetaMask) browserType = "metamask"
  if (window.ethereum?.isTrust) browserType = "trust"

  // Generate recommendations based on device and browser
  if (!isWeb3Capable) {
    if (isMobile) {
      recommendation =
        "For best experience, open this dApp in Trust Wallet or MetaMask mobile app browser. These wallets support multiple networks including BSC, Ethereum, and Polygon."
    } else {
      recommendation =
        "Please install MetaMask browser extension or use a Web3-enabled browser. MetaMask supports BSC, Ethereum, Polygon and many other networks."
    }
  } else {
    supportedNetworks = ["BSC", "Ethereum", "Polygon"]
    if (isMobile) {
      recommendation =
        "Great! Your mobile wallet supports multiple networks. ZuckaBot works best on Binance Smart Chain (BSC)."
    } else {
      recommendation = "Web3 wallet detected! ZuckaBot works on multiple networks, with BSC being the primary network."
    }
  }

  return {
    isWeb3Capable,
    browserType,
    isMobile,
    recommendation,
    supportedNetworks,
  }
}

export const isWalletAvailable = (walletType: string): boolean => {
  if (typeof window === "undefined") return false

  switch (walletType) {
    case "metamask":
      if (window.ethereum) {
        // Direct MetaMask detection
        if (window.ethereum.isMetaMask) return true

        // Check in providers array for multiple wallet scenario
        if (window.ethereum.providers) {
          return window.ethereum.providers.some((provider: any) => provider.isMetaMask)
        }

        // If ethereum exists but no specific MetaMask flag, still consider it available
        // This handles cases where MetaMask is present but not properly flagged
        return true
      }
      return false
    case "trust":
      return !!(window.ethereum && (window.ethereum.isTrust || window.ethereum))
    case "walletconnect":
      return !!window.ethereum
    default:
      return false
  }
}

export const getWalletInstallUrl = (walletType: string): string => {
  switch (walletType) {
    case "metamask":
      return "https://metamask.io/download/"
    case "trust":
      return "https://trustwallet.com/download"
    default:
      return "https://metamask.io/download/"
  }
}

export const formatCountdownTime = (seconds: number): string => {
  if (seconds <= 0) return "00:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// User-specific contract state functions
export const getUserClaimState = async (userAddress: string) => {
  try {
    const contract = await getDistributorContractReadOnly()
    if (!contract) {
      throw new Error("Unable to connect to distributor contract")
    }

    console.log("[v0] Fetching user claim state for:", userAddress)

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Contract call timeout")), 10000),
    )

    const statePromise = (async () => {
      const [hasClaimed, pendingTimestamp, secondsUntilFinalize] = await Promise.all([
        contract.hasClaimed(userAddress),
        contract.pendingClaimTimestamp(userAddress),
        contract.secondsUntilFinalize(userAddress),
      ])

      return {
        hasClaimed,
        pendingClaimTimestamp: Number(pendingTimestamp),
        secondsUntilFinalize: Number(secondsUntilFinalize),
      }
    })()

    const result = await Promise.race([statePromise, timeoutPromise])

    console.log("[v0] User claim state from contract:", result)
    return result
  } catch (error) {
    console.error("[v0] Failed to fetch user claim state:", error)
    throw error
  }
}

// Functions to save, load, and clear claim state from localStorage
export const saveClaimStateToStorage = (userAddress: string, claimState: any) => {
  if (typeof window !== "undefined") {
    const storageKey = `zuckabot-claim-${userAddress.toLowerCase()}`
    const stateToSave = {
      ...claimState,
      lastUpdated: Date.now(),
    }
    localStorage.setItem(storageKey, JSON.stringify(stateToSave))
    console.log("[v0] Saved claim state to localStorage:", stateToSave)
  }
}

export const loadClaimStateFromStorage = (userAddress: string) => {
  if (typeof window !== "undefined") {
    const storageKey = `zuckabot-claim-${userAddress.toLowerCase()}`
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        console.log("[v0] Loaded claim state from localStorage:", parsed)
        return parsed
      } catch (error) {
        console.error("[v0] Failed to parse stored claim state:", error)
        localStorage.removeItem(storageKey)
      }
    }
  }
  return null
}

export const clearClaimStateFromStorage = (userAddress: string) => {
  if (typeof window !== "undefined") {
    const storageKey = `zuckabot-claim-${userAddress.toLowerCase()}`
    localStorage.removeItem(storageKey)
    console.log("[v0] Cleared claim state from localStorage for:", userAddress)
  }
}

declare global {
  interface Window {
    ethereum?: any
  }
}
