export interface CloudinaryUploadResponse {
    data: {
      asset_id: string;
      public_id: string;
      version: Number;
      version_id: string;
      signature: string;
      width: Number;
      height: Number;
      format: string;
      resource_type: string;
      created_at: string;
      tags: string[];
      bytes: Number;
      type: string;
      etag: string;
      placeholder: false;
      url: string;
      secure_url: string;
      access_mode: string;
      original_filename: string;
    };
  }