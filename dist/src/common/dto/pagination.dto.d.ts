export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
    q?: string;
}
export declare class PaginatedResponseDto<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
}
