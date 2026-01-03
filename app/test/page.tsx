"use client"

import { Flex, Text, Button, Card, Badge } from "@radix-ui/themes";
import { useX402PaymentProduction, usePaymentReady } from "@/hooks/useX402PaymentProduction";
import { usePaymentBalance, useBestPaymentChain } from "@/hooks/useWalletBalance";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Always call hooks (Rules of Hooks) - they handle their own safety
    const paymentHook = useX402PaymentProduction();
    const paymentReady = usePaymentReady();
    const status = paymentHook.getPaymentStatus();

    // Test balance on Base Sepolia testnet
    const baseBalance = usePaymentBalance('base-sepolia');

    // Find best chain for payment
    const { chainKey: bestChain, balance: bestBalance } = useBestPaymentChain();

    // Extract values with fallbacks
    const { isReady = false, needsConnection = true, walletAddress } = paymentReady;

    return (
        <Flex direction="column" gap="4" p="4">
            <Text size="6" weight="bold">x402 Payment Integration Test</Text>

            <Card>
                <Flex direction="column" gap="2">
                    <Text weight="bold">Connection Status</Text>
                    <Text>Wallet Connected: {isReady ? "✅ Yes" : "❌ No"}</Text>
                    {walletAddress && <Text size="1">Address: {walletAddress}</Text>}
                    <Text>Payment Ready: {status?.isReady ? "✅ Yes" : "❌ No"}</Text>
                    <Text>Payment Pending: {status?.isPending ? "⏳ Yes" : "✅ No"}</Text>
                </Flex>
            </Card>

            <Card>
                <Flex direction="column" gap="2">
                    <Text weight="bold">Base Sepolia Balance</Text>
                    {baseBalance ? (
                        <>
                            <Text>Balance: {baseBalance.displayBalance} {baseBalance.symbol}</Text>
                            <Text>Has Balance: {baseBalance.hasBalance ? "✅ Yes" : "❌ No"}</Text>
                            <Text>Sufficient for Payment: {baseBalance.hasSufficientBalance ? "✅ Yes" : "❌ No"}</Text>
                            <Text>Loading: {baseBalance.isLoading ? "⏳ Yes" : "✅ No"}</Text>
                        </>
                    ) : (
                        <Text>Loading balance...</Text>
                    )}
                </Flex>
            </Card>

            <Card>
                <Flex direction="column" gap="2">
                    <Text weight="bold">Best Payment Chain</Text>
                    {bestChain ? (
                        <>
                            <Text>Chain: <Badge>{bestChain}</Badge></Text>
                            <Text>Balance: {bestBalance?.displayBalance} {bestBalance?.symbol}</Text>
                        </>
                    ) : (
                        <Text>No chain with sufficient balance found</Text>
                    )}
                </Flex>
            </Card>

            <Card>
                <Flex direction="column" gap="2">
                    <Text weight="bold">Provider Integration</Text>
                    <Text>✅ Privy Provider - Wallet UI/UX</Text>
                    <Text>✅ Thirdweb Provider - x402 Payments</Text>
                    <Text>✅ QueryClient Provider - API Queries</Text>
                    <Text>✅ Tooltip Provider - UI Components</Text>
                </Flex>
            </Card>

            {needsConnection && (
                <Card>
                    <Text>⚠️ Please connect your wallet to test payment features</Text>
                </Card>
            )}
        </Flex>
    );
}
