import React from 'react'
import { Link } from 'react-router-dom'
import { Loading } from './Loading';
import { imgService } from '../services/imgService'

export class TagPreview extends React.Component {

    state = {
        imgUrl: ''
    }

    componentDidMount() {
        this.getImgUrl()
    }


    async getImgUrl() {
        try {
            const imgs = await imgService.query();
            const idx = imgs.findIndex(img => img.name === this.props.tag)
            if (idx >= 0) {
                this.setState({ imgUrl: imgs[idx].url })
            } else {
                const data = await imgService.getNewImage(this.props.tag)
                const imgUrl = data.results[0].urls.raw
                imgService.add({ name: this.props.tag, url: imgUrl })
                this.setState({ imgUrl })
            }
        } catch (err) {
            console.log(err);
        }

    }




    render() {


        return (
            <div className="tag-preview mt10">

                {!this.state.imgUrl && <Loading />}
                {this.state.imgUrl &&
                    <div>
                        <Link to={`/list/${this.props.tag}`}>
                            <img className='tag-img cursor-pointer' src={this.state.imgUrl} alt="img" />
                        </Link>
                        <h3>{this.props.tag}</h3>
                    </div>

                }
            </div>

        )
    }
}




