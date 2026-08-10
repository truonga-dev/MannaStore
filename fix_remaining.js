const fs = require("fs");
let orderClient = fs.readFileSync("src/app/admin/(dashboard)/orders/OrderClient.tsx", "utf8");
orderClient = orderClient.replace(/suppressH?ydrationWarning/g, "suppressHydrationWarning");
fs.writeFileSync("src/app/admin/(dashboard)/orders/OrderClient.tsx", orderClient, "utf8");

let orderActions = fs.readFileSync("src/app/actions/order.ts", "utf8");
orderActions = orderActions.replace(/headers\(\)\.get/g, "(await headers()).get");
orderActions = orderActions.replace(/let validatedItems = \[\];/g, "let validatedItems: any[] = [];");
fs.writeFileSync("src/app/actions/order.ts", orderActions, "utf8");

let registerRoute = fs.readFileSync("src/app/api/auth/register/route.ts", "utf8");
registerRoute = registerRoute.replace(/headers\(\)\.get/g, "(await headers()).get");
fs.writeFileSync("src/app/api/auth/register/route.ts", registerRoute, "utf8");

console.log("Fixed!");

