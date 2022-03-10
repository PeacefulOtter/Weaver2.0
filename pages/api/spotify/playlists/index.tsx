import spotify from '../spotify';

const handler = async (req: any, res: any) =>
{
    console.log('PLAYLISTS ===');
    
    const me = await spotify.me(req)
    const { display_name, followers, images, product } = me.body;
    const pls = await spotify.playlists(req)

    const playlists = pls.body.items.map( pl => { 
        const { id, images, name } = pl
        const image = images.length > 1 ? images[1].url : images[0].url
        return { id, name, image  }
    })

    const user = {
        name: display_name,
        followers,
        image: images[0].url,
        subscription: product
    }

    res.status(200).json( { me: user, playlists } )
}

export default  handler;