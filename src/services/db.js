
// Simulated Backend Service using LocalStorage

const DB_KEY = 'holi_utsav_registrations_2026';

export const db = {
    // Save a new registration
    saveRegistration: async (data) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const currentData = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
            const newEntry = {
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                ...data
            };

            const updatedData = [...currentData, newEntry];
            localStorage.setItem(DB_KEY, JSON.stringify(updatedData));

            return { success: true, id: newEntry.id, message: "Registration successful" };
        } catch (error) {
            console.error("Database Error:", error);
            return { success: false, message: "Failed to save registration" };
        }
    },

    // Get all registrations (for Admin)
    getAllRegistrations: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    },

    // Get stats
    getStats: async () => {
        const data = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        return {
            total: data.length,
            students: data.filter(d => d.category === 'Student').length,
            professionals: data.filter(d => d.category === 'Professional').length,
            others: data.filter(d => d.category === 'Other').length,
            revenue: data.length * 499 // Assuming 499 ticket price
        };
    },

    // Clear database (Dev only)
    clearDatabase: () => {
        localStorage.removeItem(DB_KEY);
        return { success: true };
    }
};
