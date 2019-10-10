function setMeta(meta = null) {
  if (meta) {
    if (meta.description) {
      document.head.querySelector('meta[name="description"]').content = meta.description;
    }

    if (meta.title) {
      document.title = meta.title;
    }
  }
}

export {setMeta};
