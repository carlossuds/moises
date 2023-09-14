import React, { useEffect, useState } from "react";
import { Nokora } from "next/font/google";
import styles from "./AppBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "..";
import { useSongs } from "@/hooks";

const nokora = Nokora({ weight: ["900"], subsets: ["latin"] });

export const AppBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { filteredSongs } = useSongs({ search });

  useEffect(() => {
    setSearch("");
  }, [router.query]);

  return (
    <div className={`${styles.container} ${nokora.className}`}>
      <div className={styles.content}>
        <Link href="/">
          <span className={styles.muse_ai}>MUSE.ai</span>
        </Link>

        {router.pathname !== "/" && (
          <div>
            <Input
              value={search ?? ""}
              options={filteredSongs}
              onChange={(event) => setSearch(event.target.value ?? "")}
              placeholder="Search in your library"
            />
          </div>
        )}
      </div>
    </div>
  );
};
