import "../../assets/css/ComponentListWordsResponsive.css";

export const ComponentListWordsResponsive  = ({ listwords }: { listwords: string[] }) =>{
    return (
        <>
            <div id="list-words-responsive" className="list-words-responsive">
                <h3>Liste des mots entrés</h3>
                <ol>
                    {listwords.map((word, index) => (
                        <li key={index}>{word}</li>
                    ))}
                </ol>
            </div>
        </>
    );
};