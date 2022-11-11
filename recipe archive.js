useEffect(() => {
  return world.on('leave', avatar => {
    console.log(`${avatar.name} left`)
  })
}, [])
