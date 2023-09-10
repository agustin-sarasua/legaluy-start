export interface Location {
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
}
  
export interface BusinessOwner {
    name?: string;
    phone_number?: string;
    email?: string;
}

export interface PaymentOption {
    payment_method?: string;
    instructions?: string;
}

export interface PriceConfig {
    currency?: string; // Optional property
    base_price?: number; // Optional property
    weekend_price?: number; // Optional property
    extra_per_person?: number; // Optional property
}
  
export interface PriceExceptionConfig {
    day: Date; // Use Date for date type
    price: number;
}
  

export interface DayConfig {
    date: Date;
    price: number;
    is_open: boolean;
}

export interface CalendarLink {
    source: string;
    link: string;
}

export interface Property {
    id?: string;
    name?: string;
    
    price_config?: PriceConfig;
    price_exceptions?: PriceExceptionConfig[];
    days_open?: Date[];

    calendar_links?: CalendarLink[];
    booking_link?: string;
    airbnb_link?: string;
    checkin_time?: string;
    checkout_time?: string;
    description?: string;
    amenities?: string[];
    max_guests?: number;
    pick_up_keys_instructions?: string;
}

export interface Business {
    id?: string;
    user_id?: string;
    bnbot_id?: string;
    business_name?: string;
    description?: string;
    bnbot_configuration?: { [key: string]: number };
    location?: Location;
    business_owners?: BusinessOwner[];
    payment_options?: PaymentOption[];
    how_to_arrive_instructions?: string;
    properties?: Property[];
}

export interface UpdateOpenDays {
    action: string;
    days: string[];
}

export interface LoadBusinesses {
    bnbot_id?: string;
    location?: string;
    business_name?: string;
    business_owner?: string;
}

export interface Sentencia {
    materias?: string[][];
    firmantes?: string[][];
    redactores?: string[][];
    abstract?: string[][];
    descriptores?: string[][];
    resumen?: string[][];
    sentencia?: string;
    numero?: string;
    sede?: string;
    importancia?: string;
    tipo?: string;
    fecha?: string;
    ficha?: string;
    procedimiento?: string;
}

// export interface Sentencia {
//     id?: string;
//     name?: string;
//     sentencia?: string;
// }

export interface SearchSentenciasResponse {
    hits?: number;
    total_hits?: number;
    results?: Sentencia[];
}

export interface SearchForm {
    text?: string;
}

  