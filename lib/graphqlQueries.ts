import { gql, request } from 'graphql-request';
import { Database } from "./hypercerts-data-database";
import { Environment } from "@hypercerts-org/sdk";


const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;

const endpoint = ENVIRONMENT === "production" ? "https://api.hypercerts.org/v1/graphql": "https://staging-api.hypercerts.org/v1/graphql";


export type MarketplaceOrder =
  Database["public"]["Tables"]["marketplace_orders"]["Row"] & {
    hypercert_id: string;
  };

const chainId = ENVIRONMENT === 'production' ? "8453" : "84532";

const createHypercertsQuery = (first: number, offset: number) => gql`
  query hypercerts {
    hypercerts(
      where: {contract: {chain_id: {eq: "${chainId}"}}}
      first: ${first}
      offset: ${offset}
    ) {
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

const createSearchHypercertsQuery = (searchTerm: string, search_id: string, first: number, offset: number) => gql`
  query searchHypercerts {
    hypercerts(
      where: {
        contract: {chain_id: {eq: "${chainId}"}},
        hypercert_id: {contains: "${search_id}"},
        metadata: {name: {contains: "${searchTerm}"}}
      }
      first: ${first}
      offset: ${offset}
    ) {
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

const createHypercertByIdQuery = (id: string) => gql`
  query hypercertById {
    hypercerts(
      where: {hypercert_id: {eq: "${id}"}}
      first: 1
    ) {
      data {
        hypercert_id
        units
        orders {
          totalUnitsForSale
          data {
            pricePerPercentInToken
            pricePerPercentInUSD
            chainId
            currency
            signature
            additionalParameters
            signer
            price
            itemIds
            strategyId
            amounts
            id
            collectionType
            collection
            createdAt
            endTime
            orderNonce
            subsetNonce
            startTime
            globalNonce
            quoteType
            validator_codes
            hypercert_id
          }
          cheapestOrder {
            amounts
          }
        }
        metadata {
          image
          name
          work_scope
          description
        }
      }
    }
  }
`;

export async function getHypercerts(first: number = 10, offset: number = 0) {
  const query = createHypercertsQuery(first, offset);
  const res = await request<{
    hypercerts: {
      count: number,
      data: Array<{
        hypercert_id: string;
        metadata: {
          name: string;
          image: string;
          description: string;
        };
        units: number;
      }>,
    }
  }>(endpoint, query);
  return res.hypercerts;
}

export async function searchHypercerts(searchTerm: string, search_id: string, first: number = 10, offset: number = 0) {
  const query = createSearchHypercertsQuery(searchTerm, search_id, first, offset);
  const res = await request<{
    hypercerts: {
      count: number,
      data: Array<{
        hypercert_id: string;
        metadata: {
          name: string;
          image: string;
          description: string;
        };
        units: number;
      }>,
    }
  }>(endpoint, query);
  return res.hypercerts;
}

export async function getHypercertById(id: string) {
  const query = createHypercertByIdQuery(id);
  const res = await request<{
    hypercerts: {
      data: Array<{
        hypercert_id: string;
        units: number;
        orders: {
          totalUnitsForSale: number;
          data: Array<MarketplaceOrder>;
          cheapestOrder: {
            amounts: Array<number>;
          };
        };
        metadata: {
          image: string;
          name: string;
          work_scope: Array<string> | string;
          description: string;
        };
      }>,
    }
  }>(endpoint, query);
  return res.hypercerts.data || null;
}

export async function getAllHypercerts() {
  const initialResult = await getHypercerts(1, 0);
  const totalCount = initialResult.count;
  if (totalCount > 0) {
    return getHypercerts(totalCount, 0);
  }
  return initialResult;
}

/**
 * Calculates price per unit based on price per percent and total units
 */
export const getPricePerUnit = (
  pricePerPercent: string,
  totalUnits: bigint,
) => {
  const pricePerPercentBigInt = BigInt(pricePerPercent);
  const unitsPerPercent = totalUnits / BigInt(100);
  return pricePerPercentBigInt / unitsPerPercent;
};