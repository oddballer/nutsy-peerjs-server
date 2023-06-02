import cors, { CorsOptions } from "cors";
import express from "express";
import publicContent from "../../app.json";
import PublicApi from "./v1/public";
import type { IConfig } from "../config";
import type { IRealm } from "../models/realm";

export const Api = ({
	config,
	realm,
	corsOptions,
}: {
	config: IConfig;
	realm: IRealm;
	corsOptions: CorsOptions;
}): express.Router => {
	const app = express.Router();

	app.use(cors(corsOptions));

	// app.get("/", (_, res) => {
	// 	res.send(publicContent);
	// });

	app.get("/", (_, res: express.Response) => {
		if (config.allow_discovery) {
			const clientsIds = realm.getClientsIds();

			return res.send(clientsIds);
		}

		return res.sendStatus(401);
	});

	app.use("/:key", PublicApi({ config, realm }));

	return app;
};
