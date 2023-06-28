import { useEffect } from "react";
import { useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({userName}) => {
    const [repos, setRepos] = useState([]);
    const [isItLoading, setIsItLoading] = useState(true);

    useEffect(() => {
        setIsItLoading(true)
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                setIsItLoading(false);
                setRepos(resJson)
            }, 3000);
        });
    }, [userName]);

    return (
        <div className="container">
            {isItLoading ? (
                <h1>Loading...</h1>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Name:</b> 
                                {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Language:</b> 
                                {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url}>Visit on GitHub</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
    );
};

export default ReposList;