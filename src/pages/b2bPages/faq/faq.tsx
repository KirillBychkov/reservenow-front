import { Accordion, AccordionTab } from "primereact/accordion";
import { ChevronUp, ChevronDown } from "@blueprintjs/icons";
import styles from "./faq.module.scss";
import classNames from "classnames";
import Flex from "@/components/UI/layout/flex";
import { questions } from "@/constants/faq";
import { useTranslation } from "react-i18next";

const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Flex
      className={styles.container}
      options={{ direction: "column", gap: 2 }}
    >
      <Flex className={styles.header} options={{ align: "center", gap: 4 }}>
        <Flex options={{ direction: "column", gap: 0.4 }}>
          <h3 className="heading heading-3 heading-primary">
            {t("faq.howToUse")}
          </h3>
          <p
            className={classNames(
              "text",
              "text-medium-muted",
              styles.headerText
            )}
          >
            {t('faq.hosToUseAnswer')}
          </p>
        </Flex>

        <div className={styles.playerContainer}>
          <img className={styles.player} src="/src/assets/player.png" alt="ReservNow player" />
        </div>
      </Flex>

      <Accordion
        multiple
        expandIcon={
          <ChevronDown
            className={classNames(styles.expandIcon, "p-accordion-toggle-icon")}
            color="#fff"
          />
        }
        collapseIcon={
          <ChevronUp
            className={classNames(
              styles.collapseIcon,
              "p-accordion-toggle-icon"
            )}
            color="#fff"
          />
        }
      >
        {questions.map(({ localizationQuestionKey, localizationAnswerKey }) => (
          <AccordionTab
            key={localizationQuestionKey}
            header={<h3 className="heading heading-4">{t(localizationQuestionKey)}</h3>}
          >
            <p className="paragraph paragraph--normal">{t(localizationAnswerKey)}</p>
          </AccordionTab>
        ))}
      </Accordion>
    </Flex>
  );
};

export default FAQPage;
