const fs = require("fs");
const files = [
    "src/app/admin/(dashboard)/articles/ArticleClient.tsx",
    "src/app/admin/(dashboard)/articles/ArticleFormClient.tsx",
    "src/app/admin/(dashboard)/categories/CategoryClient.tsx",
    "src/app/admin/(dashboard)/coupons/CouponClient.tsx",
    "src/app/admin/(dashboard)/orders/OrderClient.tsx",
    "src/app/admin/(dashboard)/products/page.tsx",
    "src/app/admin/(dashboard)/products/[id]/EditProductForm.tsx",
    "src/app/admin/(dashboard)/settings/SettingsClient.tsx"
];

for (const file of files) {
    try {
        const content = fs.readFileSync(file, "utf8");
        const buffer = Buffer.from(content, "binary");
        const decoded = buffer.toString("utf8");
        fs.writeFileSync(file, decoded, "utf8");
        console.log("Fixed", file);
    } catch(e) {
        console.error("Error with", file, e.message);
    }
}
