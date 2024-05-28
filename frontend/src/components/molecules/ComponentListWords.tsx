import "../../assets/css/ComponentListWords.css";

export const ComponentListWords  = ({ listwords }: { listwords: string[] }) =>{
    return (
        <>
            <div className="wrapper-list-words">
                <h3>Liste des mots entrés</h3>
                <ol>
                {listwords.map((word, index) => (
                        <li key={index}>{word}</li>

                ))}</ol>
            </div>
        </>
    );
};
