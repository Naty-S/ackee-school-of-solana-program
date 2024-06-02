export interface NFTS {
  success: boolean;
  message: string;
  result: {
    name: string,
    symbol: string,
    royalty: number,
    image_uri: string,
    cached_image_uri: string,
    animation_url: string,
    cached_animation_url: string,
    metadata_uri: string,
    description: string,
    mint: string,
    owner: string,
    update_authority: string,
    creators: {
      address: string;
      verified: number;
      share: number
    }[],
    collection: {
      name: string,
      family: string
    },
    attributes: {
      type: "start_key" | "continue_key" | "treasure",
      used: boolean,

    },
    attributes_array: {
      trait_type: string,
      value: string | number | boolean
    }[],
    files: {
      type: "image/png",
      uri: string
    }[],
    external_url: string,
    primary_sale_happened: boolean,
    is_mutable: boolean,
    is_loaded_metadata: boolean
  }[]
};
