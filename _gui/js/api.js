const gameApi = async () => {
    const url = `http://192.168.0.228:9019/game-control-panel`
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            command: "hjk"
        })
    })
}
