// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { storeSymbolsInFile } from "../../../functions/printSymbols";
// import { identifyCandleWicks } from "../../../strategy/wick";
// async function create(request) {
//   // const body = await request.json();

//   try {
//     // storeSymbolsInFile(["ksks"], "ksls.js");
//     const res = await identifyCandleWicks();
//     return Response.json(
//       { data: res, message: "Contact submitted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error Submitting Contact:", error);

//     return Response.json(
//       { message: "An error while sumbitting contact📜" },
//       { status: 500 }
//     );
//   }
// }

// export { create as GET };
