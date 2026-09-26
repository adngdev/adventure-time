export const getEncodedSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("jwt secret not set")
    return new TextEncoder().encode(secret)
}