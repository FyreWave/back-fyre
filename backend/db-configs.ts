import { env } from "./configs/env";
import { randomInt } from "crypto";
import { defineDbConfig } from "xpresser-db-config/src/functions";


type Meta = {
    title?: string;
    input?: string;
    label?: string;
    help?: string;
    example?: any;
};


export = defineDbConfig<Meta>(({ v }) => {
    return [
        {
            group: "endpoints",
            autoload: true,
            config: { client: "http://localhost:5067" }
        },

        {
            group: "website",
            autoload: true,
            config: {
                name: v(env.APP_NAME, {
                    title: "Website Name",
                    input: "text",
                    help: "The name of your website",
                    example: "CoinBase"
                }),
                slogan: v("The best options market!", {
                    title: "Website Slogan",
                    input: "text",
                    help: "The slogan of your website",
                    example: "The best options market!"
                }),
                country: v("US", {
                    title: "Website Country",
                    input: "countries",
                    help: "The country where your website is operating from.",
                    example: "US"
                }),
                currency: v("USD", {
                    title: "Website Currency",
                    input: "currencies",
                    help: "The currency of your website.",
                    example: "USD"
                }),
                keywords: v(["market", "options"].join(", "), {
                    title: "Website Keywords",
                    input: "textarea",
                    help: "The keywords of your website.",
                    example: "website name, market, options"
                })
            }
        },

        {
            group: "contact",
            autoload: true,
            config: {
                email: v(`support@${env.APP_DOMAIN}`, {
                    title: "Contact Email",
                    input: "email",
                    help: "The email address where you want to receive support emails.",
                    example: `support@example.com`
                }),
                number: v(undefined as string | undefined, {
                    title: "Contact Number",
                    input: "tel",
                    help: "The phone number where you want to receive support calls.",
                    example: `+11234567890`
                })
            }
        },

        {
            group: "account",
            autoload: true,
            config: {
                idPrefix: v(randomInt(22222222, 88888888), {
                    title: "Account ID Prefix",
                    input: "text",
                    help: "The prefix of your account IDs.",
                    example: "00123456"
                })
            }
        },

        {
            group: "transaction",
            config: {
                minDeposit: v(10, {
                    title: "Minimum Deposit",
                    input: "number",
                    help: "The minimum amount allowed to deposit."
                }),
                maxDeposit: v(100_000_000, {
                    title: "Maximum Deposit",
                    input: "number",
                    help: "The maximum amount allowed to deposit."
                }),

                minTransfer: v(10, {
                    title: "Minimum Transfer",
                    input: "number",
                    help: "The minimum amount allowed to transfer."
                }),
                maxTransfer: v(100_000_000, {
                    title: "Maximum Transfer",
                    input: "number",
                    help: "The maximum amount allowed to transfer."
                }),

                minWithdraw: v(1000, {
                    title: "Minimum Withdraw",
                    input: "number",
                    help: "The minimum amount allowed to withdraw."
                }),
                maxWithdraw: v(100_000_000, {
                    title: "Maximum Withdraw",
                    input: "number",
                    help: "The maximum amount allowed to withdraw."
                }),

                minInvestment: v(10, {
                    title: "Minimum Investment",
                    input: "number",
                    help: "The minimum amount allowed to invest."
                }),
                maxInvestment: v(50000, {
                    title: "Maximum Investment",
                    input: "number",
                    help: "The maximum amount allowed to invest."
                })
            }
        }
    ];
});

