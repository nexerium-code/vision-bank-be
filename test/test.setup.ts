import { Connection } from "mongoose";

import { getConnectionToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

let connection: Connection;

export async function setupTestingModule() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();
    connection = moduleFixture.get(getConnectionToken());
    return moduleFixture;
}

export async function closeTestingModule(moduleFixture: TestingModule) {
    await clearDatabase(); // Comment out to see data after test script finishes
    await moduleFixture.close();
    if (connection) await connection.close();
}

async function clearDatabase() {
    if (!connection) return;
    try {
        const collections = Object.keys(connection.collections);
        for (const collectionName of collections) {
            const collection = connection.collections[collectionName];
            await collection.drop();
        }
    } catch (error) {
        console.error("Error clearing database:", error);
    }
}
