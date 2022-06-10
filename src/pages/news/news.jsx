import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Panel, PanelGroup } from "rsuite";
import "./news.scss";

const NewsPage = () => {
  let { index } = useParams();
  const news = useSelector((state) => state.news);

  const [currentExpandedIndex, setExpanded] = useState(index);

  useEffect(() => {
    setExpanded(index);
  }, [index]);

  const NewsPanelHeader = (props) => {
    const { urlToImage, title, description } = props.news;
    return (
      <span className="news-header">
        <div className="image-container">
          <img
            src={urlToImage || require("../../assets/logo-no-bg.png")}
            alt={title}
          />
        </div>
        <div className="header-content-container">
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
      </span>
    );
  };

  return (
    <div className="news-page">
      <div className="header">
        <h3>Trending news for you</h3>
        <p>
          <i className="uil uil-info-circle"></i>&nbsp;This is the news page
          where you can read some of the top trending news.
        </p>
      </div>
      <div className="news-container">
        <PanelGroup accordion>
          {news ? (
            news.map((item, localIndex) => {
              return (
                <Panel
                  onClick={() => setExpanded(localIndex)}
                  key={localIndex}
                  header={<NewsPanelHeader news={item} />}
                  expanded={localIndex == currentExpandedIndex}
                >
                  <p>{item.content}</p>
                  <a
                    className="news-read-more-link"
                    target="_blank"
                    rel="noreferrer"
                    href={item.url}
                  >
                    Read full article
                  </a>
                </Panel>
              );
            })
          ) : (
            <b>Nothing to show</b>
          )}
        </PanelGroup>
      </div>
    </div>
  );
};

export { NewsPage };
