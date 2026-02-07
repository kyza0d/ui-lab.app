// 'use client';
//
// import React from 'react';
// import Example1, { metadata as metadata1 } from './examples/01-variants';
// import Example2, { metadata as metadata2 } from './examples/02-joined-toggle-buttons';
// import Example3, { metadata as metadata3 } from './examples/03-split-action-button';
// import Example4, { metadata as metadata4 } from './examples/04-toolbar-buttons';
// import Example5, { metadata as metadata5 } from './examples/05-pagination-controls';
//
// const examples = [
//   {
//     id: '01',
//     Component: Example1,
//     metadata: metadata1,
//   },
//   {
//     id: '02',
//     Component: Example2,
//     metadata: metadata2,
//   },
//   {
//     id: '03',
//     Component: Example3,
//     metadata: metadata3,
//   },
//   {
//     id: '04',
//     Component: Example4,
//     metadata: metadata4,
//   },
//   {
//     id: '05',
//     Component: Example5,
//     metadata: metadata5,
//   },
// ];
//
// export default function ButtonExamplesPage() {
//   return (
//     <div className="min-h-screen bg-background p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="space-y-2 mb-12">
//           <h1 className="text-3xl font-bold text-foreground-50">Button Examples</h1>
//           <p className="text-foreground-400">
//             Local test environment for developing and refining button component examples.
//           </p>
//         </div>
//
//         <div className="space-y-12">
//           {examples.map((example) => (
//             <div key={example.id} className="space-y-4">
//               <div className="border-l-2 border-background-700 pl-6">
//                 <h2 className="text-xl font-semibold text-foreground-100">{example.metadata.title}</h2>
//                 <p className="text-sm text-foreground-500 mt-1">{example.metadata.description}</p>
//               </div>
//
//               <div className="border border-background-700 rounded-md p-6">
//                 <example.Component />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ButtonExamplesPage() {
  return <div>Button examples page - coming soon</div>;
}
