
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Application error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page panel">
          <h1>Something went wrong!</h1>
          <p>Please refresh the page and try again.</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

