// ========== Database Encryption Service
// import all modules
import { Injectable } from "@tsed/di";

@Injectable()
export class DatabaseEncryptionService {
	public encrypt(modelName: any, fields: any) {
		const fieldToSearch = new modelName(fields);
		fieldToSearch.encryptFieldsSync();

		return fieldToSearch;
	}

	public decrypt(modelName: any, fields: any) {
		const fieldToSearch = new modelName(fields);
		fieldToSearch.decryptFieldsSync();

		return fieldToSearch;
	}
}