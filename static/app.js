fetch("/cats")
  .then((res) => res.json())
  .then((cats) => {
    document.write(JSON.stringify(cats));
  });

fetch("/owners")
  .then((res) => res.json())
  .then((owners) => {
    document.write(JSON.stringify(owners));
  });