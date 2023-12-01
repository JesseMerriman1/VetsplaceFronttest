const pool = require('../db');

const Clients = {
    
    async getAllClients() {
        try {
            const allClients = await pool.query("SELECT * FROM clients");
            return allClients.rows;
        } catch (err) {
            throw err;
        }
    },

    
    async getClientById(id) {
        try {
            const client = await pool.query("SELECT * FROM clients WHERE client_id = $1", [id]);
            return client.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async createClient(clientData) {
        try {
            const { name, contact_info } = clientData;
            const newClient = await pool.query(
                "INSERT INTO clients (name, contact_info) VALUES ($1, $2) RETURNING *",
                [name, contact_info]
            );
            return newClient.rows[0];
        } catch (err) {
            throw err;
        }
    },

   
    async updateClient(id, clientData) {
        try {
            const { name, contact_info } = clientData;
            const updatedClient = await pool.query(
                "UPDATE clients SET name = $1, contact_info = $2 WHERE client_id = $3 RETURNING *",
                [name, contact_info, id]
            );
            return updatedClient.rows[0];
        } catch (err) {
            throw err;
        }
    },

   
    async deleteClient(id) {
        try {
            const deletedClient = await pool.query("DELETE FROM clients WHERE client_id = $1 RETURNING *", [id]);
            return deletedClient.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async searchClients(searchTerm) {
        try {
            const result = await pool.query("SELECT * FROM clients WHERE name ILIKE $1 OR contact_info ILIKE $1", [`%${searchTerm}%`]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    
};

module.exports = Clients;
