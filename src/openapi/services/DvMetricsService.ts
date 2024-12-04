/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Installation } from "../models/Installation";
import type { InstallationMetrics } from "../models/InstallationMetrics";
import type { InstallationsByCountry } from "../models/InstallationsByCountry";
import type { InstallationVersionInfo } from "../models/InstallationVersionInfo";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DvMetricsService {
	/**
	 * Get all installations
	 * Returns a list of all registered Dataverse installations
	 * @returns Installation Installation list success
	 * @throws ApiError
	 */
	public static getInstallations(): CancelablePromise<Installation> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/installation",
			errors: {
				400: `Bad Request on installation list`,
				500: `Internal Server Error on installation list`,
			},
		});
	}
	/**
	 * Create Installation
	 * Create a new Dataverse installation
	 * @param requestBody Dataverse installation to be created
	 * @returns Installation Installation creation success
	 * @throws ApiError
	 */
	public static createInstallation(
		requestBody?: Installation,
	): CancelablePromise<Installation> {
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/installation",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				400: `Bad Request on installation creation`,
				500: `Internal Server Error on installation creation`,
			},
		});
	}
	/**
	 * Get installations status
	 * Returns a list of the most recent status of all registered Dataverse installations
	 * @returns InstallationVersionInfo Installations Status list success
	 * @throws ApiError
	 */
	public static geInstallationsStatus(): CancelablePromise<
		Array<InstallationVersionInfo>
	> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/installation/status",
			errors: {
				400: `Bad Request on installation status`,
				500: `Internal Server Error on installation status`,
			},
		});
	}
	/**
	 * Get the basic metrics of the registered installations
	 * Returns a set of metrics for each one of the registered dataverse installations
	 * @returns InstallationMetrics Registered installations metrics success
	 * @throws ApiError
	 */
	public static getInstallationsMetrics(): CancelablePromise<
		Array<InstallationMetrics>
	> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/installation/metrics",
			errors: {
				400: `Bad Request on registered installations metrics list`,
				500: `Internal Server Error on registered installations metrics`,
			},
		});
	}
	/**
	 * Get a count of the installations by country
	 * Returns a count of the number of registered Dataverse installations by country
	 * @returns InstallationsByCountry Installation by country count success
	 * @throws ApiError
	 */
	public static getInstallationsByCountry(): CancelablePromise<
		Array<InstallationsByCountry>
	> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/installation/country",
			errors: {
				400: `Bad Request on Installation by country count list`,
				500: `Internal Server Error on Installation by country count`,
			},
		});
	}
}
