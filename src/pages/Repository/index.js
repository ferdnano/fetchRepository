import React, { Component } from 'react';
import api from '../../services/api';

export default class Repository extends Component {
    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        // api.github.com/repos/rocketseat/unform

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: { // Opções de retorno
                    state: 'open', // Somente as que estão abertas
                    per_page: 5, // Quantidade de retornos
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        })
    }

    render() {
        const { repository, issues, loading } = this.state;

        return <h1>Repository</h1>;
    }
}
