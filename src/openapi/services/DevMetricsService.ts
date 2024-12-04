/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Installation } from "../models/Installation";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DevMetricsService {
	/**
	 * Get all metrics from tracked repositories
	 * Returns the latest metrics from all tracked repositories
	 * @returns Installation Dev metrics success
	 * @throws ApiError
	 */
	public static getDevMetrics(): CancelablePromise<Installation> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/dev",
			errors: {
				400: `Bad Request on dev-metrics`,
				500: `Internal Server Error on idev-metricst`,
			},
		});
	}
	/**
	 * Get all releases information
	 * Returns a list with the information from the releases
	 * @returns Installation Releases list success
	 * @throws ApiError
	 */
	public static getMethodName(): CancelablePromise<Installation> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/dev/releases",
			errors: {
				400: `Bad Request on dev-releases list`,
				500: `Internal Server Error on dev-releases list`,
			},
		});
	}
}
