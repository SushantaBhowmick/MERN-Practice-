<!-- For Prisma -->
npm install prisma --save-dev
npx prisma init
npm install @prisma/client
<!-- Then add your schema or model and run the migration -->
npx prisma migrate dev --name init

npx prisma generate