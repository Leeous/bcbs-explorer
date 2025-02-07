import * as React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h4>404 Not Found</h4>
      <Link to={ '/' }>Home</Link>
    </div>
  );
}