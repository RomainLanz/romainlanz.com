import { HttpContext } from '@adonisjs/core/http';
import { BaseSerializer } from '@adonisjs/core/transformers';

type ApiPaginatorMetaData = {
	total: string;
	perPage: string;
	currentPage: string;
	lastPage: string;
	firstPage: string;
	firstPageUrl: string;
	lastPageUrl: string;
	nextPageUrl: string;
	previousPageUrl: string;
};

/**
 * Custom serializer for API responses that ensures consistent JSON structure
 * across all API endpoints. Wraps response data in a 'data' property and handles
 * pagination metadata for paginated API results.
 */
class ApiSerializer extends BaseSerializer<{
	Wrap: 'data';
	PaginationMetaData: ApiPaginatorMetaData;
}> {
	/**
	 * Wraps all serialized data under this key in the response object.
	 * Example: { data: [...] } instead of returning raw arrays/objects
	 */
	wrap: 'data' = 'data';

	/**
	 * Validates and defines pagination metadata structure for paginated responses.
	 * Ensures that pagination info is properly formatted.
	 *
	 * @throws Error if metadata doesn't match the expected pagination structure
	 */
	definePaginationMetaData(metaData: unknown): ApiPaginatorMetaData {
		if (!this.isLucidPaginatorMetaData(metaData)) {
			throw new Error('Invalid pagination metadata. Expected metadata to contain pagination keys');
		}
		return metaData;
	}
}

/**
 * Single instance of ApiSerializer used across the application
 */
const serializer = new ApiSerializer();
const serialize = Object.assign(
	function (this: HttpContext, ...[data, resolver]: Parameters<ApiSerializer['serialize']>) {
		return serializer.serialize(data, resolver ?? this.containerResolver);
	},
	{
		withoutWrapping(this: HttpContext, ...[data, resolver]: Parameters<ApiSerializer['serializeWithoutWrapping']>) {
			return serializer.serializeWithoutWrapping(data, resolver ?? this.containerResolver);
		},
	}
) as ApiSerializer['serialize'] & { withoutWrapping: ApiSerializer['serializeWithoutWrapping'] };

/**
 * Adds the serialize method to all HttpContext instances.
 * Usage in controllers: return ctx.serialize(data)
 * This ensures all API responses follow the same structure with data wrapping.
 */
HttpContext.instanceProperty('serialize', serialize);

/**
 * Module augmentation to add the serialize method to HttpContext.
 * This allows controllers to use ctx.serialize() for consistent API responses.
 */
declare module '@adonisjs/core/http' {
	export interface HttpContext {
		serialize: typeof serialize;
	}
}
