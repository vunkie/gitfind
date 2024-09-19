import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/ItemList";
import "./styles.css";

function App() {
	const [user, setUser] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const [repos, setRepos] = useState([]);

	const handleGetData = async () => {
		const response = await fetch(`https://api.github.com/users/${user}`);
		const data = await response.json();

		if (data.name) {
			const { avatar_url, name, bio, login } = data;
			setCurrentUser(avatar_url, name, bio, login);

			const responseRepos = await fetch(
				`https://api.github.com/users/${user}/repos`
			);
			const dataRepos = await responseRepos.json();

			if (dataRepos.length > 0) {
				setRepos(dataRepos);
			}
		}
	};

	return (
		<div className='App'>
			<Header />
			<div className='conteudo'>
				<img
					src={background}
					className='background'
					alt='background app'
				/>
				<div className='info'>
					<div>
						<input
							name='usuario'
							value={user}
							onChange={(event) => setUser(event.target.value)}
							placeholder='@username'
						/>
						<button onClick={handleGetData}>Buscar</button>
					</div>
					{currentUser?.name ? (
						<>
							<div className='perfil'>
								<img
									src={currentUser.avatar_url}
									className='profile'
									alt=''
								/>
								<div>
									<h3>{currentUser.name}</h3>
									<span>@{currentUser.login}</span>
									<p>{currentUser.bio}</p>
								</div>
							</div>
							<hr />
						</>
					) : null}
          {repos?.length > 0 ? (
            <div>
						<h4 className='repositorio'>Repositórios</h4>
            {repos.map((repo) => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
					</div>
          ) : null}
					
				</div>
			</div>
		</div>
	);
}

export default App;
