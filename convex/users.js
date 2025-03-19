import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        // If USer already exist
        const userData = await ctx.db.query('user')
        .filter(q => q.eq(q.field('email'), args.email))
        .collect();

        // If not then add new User]
        if(userData?.length == 0) {
            const data = {
                name: args.name,
                email: args.email,
                credits: 50000,
            }
            const result = await ctx.db.insert('user', {
                ...data
            });
            console.log(result);
            return data;
        }
        return userData[0];
    }
})