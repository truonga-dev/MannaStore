const fs = require("fs");

const fileList = [
    "src/app/admin/(dashboard)/articles/ArticleClient.tsx",
    "src/app/admin/(dashboard)/articles/ArticleFormClient.tsx",
    "src/app/admin/(dashboard)/categories/CategoryClient.tsx",
    "src/app/admin/(dashboard)/coupons/CouponClient.tsx",
    "src/app/admin/(dashboard)/orders/OrderClient.tsx",
    "src/app/admin/(dashboard)/products/page.tsx",
    "src/app/admin/(dashboard)/products/[id]/EditProductForm.tsx",
    "src/app/admin/(dashboard)/settings/SettingsClient.tsx"
];

// Read each file, do manual replacements for known garbled text
for (const file of fileList) {
    let content = fs.readFileSync(file, "utf8");
    
    // Global replacements
    content = content.replace(/Bn cA3 ch_c ch_n mu n xA3a/g, "B?n có ch?c ch?n mu?n xóa");
    content = content.replace(/bAi vit nAy khA'ng\?/g, "bài vi?t này không?");
    content = content.replace(/XA3a bAi vit thAnh cA'ng!/g, "Xóa bài vi?t thành công!");
    content = content.replace(/XA3a tht bi!/g, "Xóa th?t b?i!");
    content = content.replace(/\?A xy ra l i!/g, "Ðã x?y ra l?i!");
    content = content.replace(/Qun lA BAi vit/g, "Qu?n lý Bài vi?t");
    content = content.replace(/To bAi vit m:i/g, "T?o bài vi?t m?i");
    content = content.replace(/TiAu  \?/g, "Tiêu d?");
    content = content.replace(/TAc gi/g, "Tác gi?");
    content = content.replace(/Trng thAi/g, "Tr?ng thái");
    content = content.replace(/NgAy  'ng/g, "Ngày dang");
    content = content.replace(/HAnh  "ng/g, "Hành d?ng");
    content = content.replace(/Cha cA3 bAi vit nAo\./g, "Chua có bài vi?t nào.");
    content = content.replace(/\?A xut bn/g, "Ðã xu?t b?n");
    content = content.replace(/Bn nhAp/g, "B?n nháp");
    content = content.replace(/S-a bAi vit/g, "S?a bài vi?t");
    content = content.replace(/XA3a bAi vit/g, "Xóa bài vi?t");
    content = content.replace(/Xem trAn trang web/g, "Xem trên trang web");
    content = content.replace(/bAi vit/g, "bài vi?t");
    
    fs.writeFileSync(file, content, "utf8");
    console.log("Fixed strings in", file);
}
