/**
 * Global pass-through (pt) for PrimeVue Select.
 * Aligns panel, label, dropdown, overlay, header and filter with app CSS (main.css).
 * Use via PrimeVue global config so all Select components share this styling.
 */
export const selectPt = {
  root: [
    'flex flex-row flex-nowrap items-center w-[80%] min-w-[50%]',
    'bg-bg-0 text-text-primary',
    'border border-white/20 rounded-lg',
    'py-1.5 pl-3 pr-1',
    'focus-within:outline-none focus-within:ring-0 focus-within:border-neon-a',
  ].join(' '),
  label: [
    'flex-1 min-w-0 bg-transparent border-0 outline-none ring-0',
    'focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0',
    'text-text-primary placeholder:text-text-muted',
  ].join(' '),
  dropdown: 'shrink-0 flex items-center justify-center text-text-muted',
  overlay: [
    'w-[10%] min-w-[10%] rounded-lg border border-black/20 bg-bg-0 shadow-xl',
    'text-text-primary',
    'z-[9999]',
  ].join(' '),
  header: 'p-2 border-b border-white/10',
  pcFilterContainer: {
    root: [
      'flex items-center w-full gap-2',
      'rounded border border-white/20 bg-bg-1',
      'focus-within:ring-2 focus-within:ring-neon-a focus-within:border-neon-a',
    ].join(' '),
  },
  pcFilter: {
    root: [
      'flex-1 min-w-0 bg-transparent border-0 outline-none',
      'px-2 py-1.5 text-text-primary placeholder:text-text-muted',
    ].join(' '),
  },
  listContainer: 'max-h-[200px] max-w-[80%] overflow-auto',
  list: 'py-1',
  option: [
    'px-3 py-2 cursor-pointer',
    'text-text-primary',
  ].join(' '),
  emptyMessage: 'px-3 py-4 text-text-muted text-sm',
}
