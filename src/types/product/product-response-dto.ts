import { MultimediaInfoDto } from '@/types/product/multimedia-info-dto';

export type ProductSearchResultDto = {
  rsp_msg: string;
  rsp_code: number;

  result: {
    ae_multimedia_info_dto: MultimediaInfoDto;
    package_info_dto: {
      base_unit: number;
      package_height: number;
      gross_weight: string;
      package_length: number;
      package_width: number;
      product_unit: number;
      package_type: boolean;
    };
    ae_store_info: {
      item_as_described_rating: string;
      communication_rating: string;
      shipping_speed_rating: string;
      store_name: string;
      store_id: number;
      store_country_code: string;
    };
    product_id_converter_result: {
      main_product_id: number;
      sub_product_id: {
        [key: string]: number;
      };
    };
    logistics_info_dto: {
      ship_to_country: string;
      delivery_time: number;
    };
    ae_item_base_info_dto: {
      category_sequence: string;
      gmt_modified: string;
      product_id: number;
      subject: string;
      product_status_type: string;
      gmt_create: string;
      mobile_detail: string;
      avg_evaluation_rating: string;
      ws_display: string;
      evaluation_count: string;
      ws_offline_date: string;
      owner_member_seq_long: number;
      detail: string;
      currency_code: string;
      category_id: number;
      sales_count: string;
    };
    ae_item_properties: {
      attr_value_start: string;
      attr_value_id: number;
      attr_value_end: string;
      attr_value: string;
      attr_value_unit: string;
      attr_name: string;
      attr_name_id: number;
    }[];
    ae_item_sku_info_dtos: {
      sku_attr: string;
      sku_stock: boolean;
      sku_price: string;
      offer_sale_price: string;
      id: string;
      ae_sku_property_dtos: {
        wholesale_price_tiers: any[];
        buy_amount_limit_set_by_promotion: string;
        limit_strategy: string;
        sku_property_value: string;
        property_value_id: number;
        sku_property_name: string;
        sku_property_id: number;
        property_value_definition_name: string;
        sku_image: string;
      }[];
      barcode: string;
      currency_code: string;
      sku_code: string;
      sku_id: string;
      ipm_sku_stock: number;
      offer_bulk_sale_price: string;
      sku_available_stock: number;
    }[];
  };
};
