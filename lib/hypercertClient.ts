"use client"
import { Environment, HypercertClient } from "@hypercerts-org/sdk";
import { useWalletClient, usePublicClient } from "wagmi";
import { gql, request } from 'graphql-request';


const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
const graphUrl = ENVIRONMENT === "production" ? "https://api.hypercerts.org/v1/graphql": "https://staging-api.hypercerts.org/v1/graphql";

export const useHypercertClient = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const client = new HypercertClient({
    environment: ENVIRONMENT,
    walletClient,
    publicClient,
    graphUrl
  });

  console.log("client", client)

  return { client };
};
// const test = useHypercertClient();

// console.log("tessssssst", test)

const query = gql`
  query hypercerts {
    hypercerts {
      count
      data {
        hypercert_id
        metadata {
            name
            image
            description
        }
        units
      }
    }
  }
`;

export async function getHypercerts() {
  try {
    const res = await request(graphUrl, query);
    console.log("Hypercerts:", res);
    return res;
  } catch (error) {
    console.error("Error fetching hypercerts:", error);
    throw error;
  }
}