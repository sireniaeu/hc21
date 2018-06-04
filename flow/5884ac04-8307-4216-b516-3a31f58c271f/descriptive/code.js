try {
  Fields['Notat - NavigatorTree'].select(nogleord);
  Fields["Notat - Fritekst"].input(fritekst);
} catch (e) {
  Dialog.warn('Advarsel', nogleord +' kan ikke opdateres.', { 'timeout': 5 });
}