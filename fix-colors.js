const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  ['text-[#20388F] dark:text-[#F58220]', 'text-black dark:text-white'],
  ['hover:text-[#20388F] dark:hover:text-[#F58220]', 'hover:text-black dark:hover:text-white'],
  ['hover:text-[#F58220] dark:hover:text-[#20388F]', 'hover:text-black dark:hover:text-white'],
  ['group-hover:text-[#20388F] dark:group-hover:text-[#F58220]', 'group-hover:text-black dark:group-hover:text-white'],
  ['dark:group-hover:text-[#F58220]', 'dark:group-hover:text-white'],
  ['group-hover:text-[#20388F]', 'group-hover:text-black'],
  ['group-hover:border-[#20388F]/30 dark:group-hover:border-[#F58220]/30', 'group-hover:border-black/30 dark:group-hover:border-white/30'],
  ['group-hover:border-[#20388F] dark:group-hover:border-[#F58220]', 'group-hover:border-black dark:group-hover:border-white'],
  ['group-hover:border-[#20388F]', 'group-hover:border-black'],
  ['bg-[#20388F]/10 dark:bg-[#F58220]/10', 'bg-black/10 dark:bg-white/10'],
  ['bg-[#20388F]/10', 'bg-black/10'],
  ['bg-[#F58220]/10', 'bg-black/10'],
  ['dark:text-[#F58220]', 'dark:text-white'],
  ['dark:text-[#20388F]', 'dark:text-white'],
  ['text-[#20388F]', 'text-black'],
  ['text-[#F58220]', 'text-black'],
  ['dark:bg-[#F58220]', 'dark:bg-white'],
  ['dark:bg-[#20388F]', 'dark:bg-white'],
  ['bg-[#20388F]', 'bg-black'],
  ['bg-[#F58220]', 'bg-black'],
  ['hover:bg-[#F58220]/90', 'hover:bg-black/80'],
  ['hover:bg-[#d9721b]', 'hover:bg-black/80'],
  ['hover:bg-[#1a2d73]', 'hover:bg-black/80'],
  ['from-[#20388F]/80', 'from-black/80'],
  ['from-[#F58220]/80', 'from-black/80'],
  ['selection:bg-[#F58220]', 'selection:bg-black'],
  ['shadow-[0_0_15px_rgba(245,130,32,0.5)]', 'shadow-xl'],
];

let count = 0;
for (const [find, replace] of replacements) {
  const before = c.split(find).length - 1;
  c = c.split(find).join(replace);
  count += before;
}

fs.writeFileSync('src/App.tsx', c, 'utf8');
console.log('Done! Replaced', count, 'instances.');
